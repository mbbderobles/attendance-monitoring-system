package prerequisites:
	libxml2-dev		for XML parser
	libmysqlclient-dev	for mysql commands

compilation:
	gcc record_parser.c -std=c99 `mysql_config --cflags --libs` `xml2-config --cflags --libs`
