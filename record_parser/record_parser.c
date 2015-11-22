#include <mysql.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <libxml/parser.h>

// Change this to the location of the xml to be parsed.
#define loc "attendancedb.xml"

void exit_with_error(MYSQL *con);

int main(){

	MYSQL *con = mysql_init(NULL);

	xmlDocPtr doc;
	xmlNodePtr root, node1, node2;
	xmlChar *subject, *studentNumber, *name, *timestamp;
	
	char query[9999];

	// Establish MySQL connection
	if(con == NULL){
		fprintf(stderr, "%s\n", mysql_error(con));
		exit(1);
	}

	if(mysql_real_connect(con, "localhost", "admin", "password1234", "ams", 0, NULL, 0) == NULL){
		exit_with_error(con);
	}

	// Parse XML file using libxml2
	
	doc = xmlParseFile(loc);
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
        strcpy(query, "INSERT INTO attendance_record (courseId, sectionId, studentNumber, attended) SELECT courseId, 0, \'");
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

	mysql_close(con);
	exit(0);

}

void exit_with_error(MYSQL *con){
	fprintf(stderr, "%s\n", mysql_error(con));
	mysql_close(con);
	exit(1);
}

