#!/bin/bash

# Set Oracle environment variables
export ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome_1
export PATH=$ORACLE_HOME/bin:$PATH
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH

# Set variables for database connection
export ORACLE_SID=libampdb
export ORACLE_USER=system
export ORACLE_PASSWORD=Oracle19c
export ORACLE_HOST=LIB-PRI-DBSRV

# Set variables for Excel file
export EXCEL_FILE=/path/to/excel/file.xlsx
export SHEET_NAME=Sheet1

# Execute SQL statements and generate Excel file
sqlplus -S ${ORACLE_USER}/${ORACLE_PASSWORD}@${ORACLE_HOST}/${ORACLE_SID} << EOF
SET HEADING OFF
SET PAGESIZE 0
SET FEEDBACK OFF

SELECT COUNT(*) AS num_sessions
FROM V\$SESSION s
JOIN V\$PROCESS p ON s.paddr = p.addr
WHERE s.program LIKE '%fglrun%' and OSUSER = 'gas';

SELECT sid, serial#, username, program, machine, status FROM v\$session;

SELECT COUNT(*) AS num_processes
FROM V\$PROCESS;

SELECT name, value/1024/1024 AS pga_mb
FROM V\$PGASTAT
WHERE name = 'total PGA allocated';

SELECT value/1024/1024 AS pga_mb
FROM V\$PGASTAT
WHERE name = 'total PGA allocated';

EXIT;
EOF

echo "num_sessions" > ${EXCEL_FILE}
cat ${ORACLE_HOME}/bin/sqlplus | ${ORACLE_USER}/${ORACLE_PASSWORD}@${ORACLE_HOST}/${ORACLE_SID} | sed 's/|/,/g' >> ${EXCEL_FILE}

echo "sid,serial#,username,program,machine,status" > ${EXCEL_FILE}
cat ${ORACLE_HOME}/bin/sqlplus | ${ORACLE_USER}/${ORACLE_PASSWORD}@${ORACLE_HOST}/${ORACLE_SID} | sed 's/|/,/g' >> ${EXCEL_FILE}

echo "num_processes" > ${EXCEL_FILE}
cat ${ORACLE_HOME}/bin/sqlplus | ${ORACLE_USER}/${ORACLE_PASSWORD}@${ORACLE_HOST}/${ORACLE_SID} | sed 's/|/,/g' >> ${EXCEL_FILE}

echo "name,pga_mb" > ${EXCEL_FILE}
cat ${ORACLE_HOME}/bin/sqlplus | ${ORACLE_USER}/${ORACLE_PASSWORD}@${ORACLE_HOST}/${ORACLE_SID} | sed 's/|/,/g' >> ${EXCEL_FILE}

echo "pga_mb" > ${EXCEL_FILE}
cat ${ORACLE_HOME}/bin/sqlplus | ${ORACLE_USER}/${ORACLE_PASSWORD}@${ORACLE_HOST}/${ORACLE_SID} | sed 's/|/,/g' >> ${EXCEL_FILE}

# Add header row to Excel file
sed -i '1inum_sessions' ${EXCEL_FILE}
sed -i '1isid,serial#,username,program,machine,status' ${EXCEL_FILE}
sed -i '1inum_processes' ${EXCEL_FILE}
sed -i '1iname,pga_mb' ${EXCEL_FILE}
sed -i '1ipga_mb' ${EXCEL_FILE}

# Convert to XLSX
unoconv -f xlsx ${EXCEL_FILE}

# Rename sheet
xlsxwriter ${EXCEL_FILE}.xlsx --rename-sheet="${SHEET_NAME}"

# Remove temporary files
rm ${EXCEL_FILE}
rm ${EXCEL_FILE}.csv
