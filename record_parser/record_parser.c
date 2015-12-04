#define __USE_XOPEN
#define _GNU_SOURCE

#include <mysql.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <libxml/parser.h>

void exit_with_error(MYSQL *con);
void set_timestamp(char * timestamp, int *day, int *hour, int *min);
void set_times(char * time, int *start_h, int *start_m, int *end_h, int *end_m);

int main(int argc, char *argv[]){

    MYSQL *con = mysql_init(NULL);

    xmlDocPtr doc;
    xmlNodePtr root, node1, node2;
    xmlChar *subject, *studentNumber, *name, *timestamp;

    char query[9999];
    MYSQL_RES *result;
    MYSQL_ROW row;
    int day, hour, min;
    int start_h, start_m, end_h, end_m;

    int i;
    char sectionId[100];

    // Establish MySQL connection
    if(con == NULL){
	    fprintf(stderr, "%s\n", mysql_error(con));
	    exit(1);
    }

    if(mysql_real_connect(con, "localhost", "admin", "password1234", "ams", 0, NULL, 0) == NULL){
	    exit_with_error(con);
    }

    // Parse XML file using libxml2
    // XML to parse is passed as an argument
    doc = xmlParseFile(argv[1]);
    root = xmlDocGetRootElement(doc);

    for(node1 = root->xmlChildrenNode; node1; node1 = node1->next){
        if(node1->type == 3) continue;
        for(node2 = node1->xmlChildrenNode; node2; node2 = node2->next){
            if(node2->type == 3) continue;
            if((!xmlStrcmp(node2->name, (const xmlChar *)"SUBJECT"))){
                subject = xmlNodeListGetString(doc, node2->xmlChildrenNode, 1);
            }else if((!xmlStrcmp(node2->name, (const xmlChar *)"IDNO"))){
                studentNumber = xmlNodeListGetString(doc, node2->xmlChildrenNode, 1);
            }else if((!xmlStrcmp(node2->name, (const xmlChar *)"NAME"))){
                name = xmlNodeListGetString(doc, node2->xmlChildrenNode, 1);
            }else if((!xmlStrcmp(node2->name, (const xmlChar *)"TIMESTAMP"))){
                timestamp = xmlNodeListGetString(doc, node2->xmlChildrenNode, 1);
            }
        }
        
        // Find section using course and timestamp
        strcpy(query, "SELECT studentNumber, courseId, courseNum, sectionId, day, time FROM course NATURAL JOIN section NATURAL JOIN student_section WHERE courseNum=\"");
        strcat(query, subject);
        strcat(query, "\" AND studentNumber=\"");
        strcat(query, studentNumber);
            strcat(query, "\";");
        if(mysql_query(con, query)){
            exit_with_error(con);
        }
        
        result = mysql_store_result(con);
        if(result == NULL){
            exit_with_error(con);
        }
        
        set_timestamp(timestamp, &day, &hour, &min);
        strcpy(sectionId, "-1");
        
        while(row = mysql_fetch_row(result)){
            set_times(row[5], &start_h, &start_m, &end_h, &end_m);
            if(row[4][day] == '1'){
                //printf("%d %d vs %d %d vs %d %d\n", hour, min, start_h, start_m, end_h, end_m);
                if(hour >= start_h && hour < end_h){
                    strcpy(sectionId, row[3]);
                }
            }
        }
        
        mysql_free_result(result);
        
        if(strcmp(sectionId, "-1") != 0){
            // Build the string query for insert
            strcpy(query, "INSERT INTO attendance_record (courseId, sectionId, studentNumber, attended) SELECT courseId, ");
            strcat(query, sectionId);
            strcat(query, ", \'");
            strcat(query, studentNumber);
            strcat(query, "\', STR_TO_DATE(\'");
            strcat(query, timestamp);
            strcat(query, "\', \'%m/%d/%Y %h:%i %p\') FROM course WHERE courseNum=\"");
            strcat(query, subject);
            strcat(query, "\";");
            //printf("%s\n", query);
            
            if(mysql_query(con, query)){
                exit_with_error(con);
            }
            
        }
        
    }

    mysql_close(con);
    exit(0);

}

void exit_with_error(MYSQL *con){
	fprintf(stderr, "%s\n", mysql_error(con));
	mysql_close(con);
	exit(1);
}

void set_timestamp(char * timestamp, int *day, int *hour, int *min){

    struct tm tm;
    
    strptime(timestamp, "%m/%d/%Y %I:%M %p", &tm);
    *day =  tm.tm_wday;
    *hour = tm.tm_hour;
    *min = tm.tm_min;
    
}

void set_times(char * time, int *start_h, int *start_m, int *end_h, int *end_m){

    int i, j;
    char temp[3];
    
    for(i=0, j=0; time[i]!=':'; i++){
        temp[j++] = time[i];
    }
    temp[j] = '\0';
    *start_h = atoi(temp);
    if(*start_h < 7) *start_h+=12;
    i++;
    for(j=0; time[i]!='-'; i++){
        temp[j++] = time[i];
    }
    temp[j] = '\0';
    i++;
    *start_m = atoi(temp);
    for(j=0; time[i]!=':'; i++){
        temp[j++] = time[i];
    }
    temp[j] = '\0';
    *end_h = atoi(temp);
    if(*end_h <= 7) *end_h+=12;
    i++;
    for(j=0; time[i]!='\0'; i++){
        temp[j++] = time[i];
    }
    temp[j] = '\0';
    *end_m = atoi(temp);
    
}

