@echo off
REM script temporal para facilitarme la vida

set DB_NAME=temp_db
set DB_USER=temp_user
set DB_PASSWORD=temp_password
set DB_PORT=5432

echo creando directorio de datos...
if not exist "data" (
    mkdir data
    if exist "C:\VGXDB\pgsql\bin\initdb.exe" (
        echo inicializando base de datos...
        "C:\VGXDB\pgsql\bin\initdb.exe" -D "data" --username=%DB_USER% --auth=trust
    ) else (
        echo Error: No se encontro initdb.exe en C:\VGXDB\pgsql\bin\
        echo Asegurese de que PostgreSQL este instalado correctamente
        pause
        exit /b 1
    )
)

echo verificando si PostgreSQL esta corriendo...
tasklist /FI "IMAGENAME eq postgres.exe" 2>NUL | find /I /N "postgres.exe">NUL
if %ERRORLEVEL% EQU 0 (
    echo PostgreSQL ya esta corriendo
) else (
    echo iniciando PostgreSQL...
    REM intentar iniciar PostgreSQL usando pg_ctl
    if exist "C:\VGXDB\pgsql\bin\pg_ctl.exe" (
        "C:\VGXDB\pgsql\bin\pg_ctl.exe" start -D "data" -l "postgresql.log" -o "-p %DB_PORT%"
        timeout /t 5 /nobreak >nul
    ) else (
        echo Error: No se encontro pg_ctl.exe en C:\VGXDB\pgsql\bin\
        echo Asegurese de que PostgreSQL este instalado correctamente
        pause
        exit /b 1
    )
)

echo verificar nuevamente si esta corriendo
tasklist /FI "IMAGENAME eq postgres.exe" 2>NUL | find /I /N "postgres.exe">NUL
if %ERRORLEVEL% NEQ 0 (
    echo Error: PostgreSQL no pudo iniciarse
    pause
    exit /b 1
)

echo creando base de datos temporal si no existe...
if exist "C:\VGXDB\pgsql\bin\createdb.exe" (
    "C:\VGXDB\pgsql\bin\createdb.exe" -U %DB_USER% -p %DB_PORT% %DB_NAME% 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo La base de datos %DB_NAME% ya existe o no se pudo crear
    ) else (
        echo Base de datos %DB_NAME% creada
    )
) else (
    echo Advertencia: No se pudo verificar/crear la base de datos
    echo createdb.exe no encontrado
)

echo configurando el entorno
set HOST=localhost
set DB_PORT=%DB_PORT%
set DB_USERNAME=%DB_USER%
set DB_PASSWORD=%DB_PASSWORD%
set DATABASE=%DB_NAME%
set JWT_SECRET=temp_jwt_secret
set COOKIE_KEY=temp_cookie_key

echo inicializando backend
cd backend
if not exist "node_modules" (
    echo instalando dependencias...
    npm install
)

echo ejecutando el backend...
npm run dev