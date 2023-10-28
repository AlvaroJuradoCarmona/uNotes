import {getConnection} from "../database";
import {methods as achievementsLib} from "../libs/achievement"

const getFiles = async (req,res) => {
    try{
        const connection = await getConnection();
        
        const query = await connection.query("SELECT * FROM documents ORDER BY title ASC");
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getFileById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query("SELECT * FROM documents WHERE idDocument = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const addFile = async (req, res) => {
    try {
        const connection = await getConnection();     
        const {title, url, id, selectedCategory, idUser, selectedLicense} = req.body;
        
        if(title === '' || url === '')
            return res.status(500).json({message: "Fill all fields"})

        const file = {title, url, idSubject: id, idCategory: selectedCategory, idUser, idLicense: selectedLicense}
        await connection.query(`INSERT INTO documents SET ?`, file);   
        
        if (await achievementsLib.fileCount(idUser) >= 10)
            await achievementsLib.checkAchievement(2, idUser, 200)
        else
            await achievementsLib.checkAchievement(1, idUser, 50)

        res.json("Success!!");
    } catch (error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const addCode = async (req, res) => {
    try {
        const connection = await getConnection();     
        const {title, description, id, idUser, selectedLanguage, selectedLicense} = req.body;
        
        if(title === '' || description === '')
            return res.status(500).json({message: "Fill all fields"})
        if(title.length < 6)
            return res.status(500).json({message: "Needs to be longer"})

        const file = {title, description, idSubject: id, idCategory: selectedLanguage, idUser, idLicense: selectedLicense}
        await connection.query(`INSERT INTO documents SET ?`, file);

        if (await achievementsLib.fileCount(idUser) >= 10)
            await achievementsLib.checkAchievement(2, idUser, 200)
        else
            await achievementsLib.checkAchievement(1, idUser, 50)
        
        res.json("Success!!");
    } catch (error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getFilesBySubjectId = async (req,res) => {
    try{
        const connection = await getConnection();
        const {idSubject} = req.params;

        const query = await connection.query(`SELECT d.idDocument, d.title, DATE_FORMAT(d.created_at, '%d-%m-%Y') AS created_at, d.idCategory, u.username, u.avatar_url 
                                                FROM documents d LEFT JOIN users u ON d.idUser=u.idUser 
                                                WHERE d.idSubject = ? ORDER BY d.created_at DESC;`, idSubject);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getFilesByUserId = async (req,res) => {
    try{
        const connection = await getConnection();
        const {idUser} = req.params;

        const query = await connection.query(`SELECT idDocument, title, idCategory 
                                                FROM documents
                                                WHERE idUser = ?
                                                ORDER BY created_at DESC;`, idUser);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const addViewLog = async (req,res) => {
    try {
        const connection = await getConnection();     
        const { idUser, idDocument } = req.body;

        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0] + ' 00:00:00';

        const [ existingView ] = await connection.query(`SELECT * FROM views_log 
                                                    WHERE idUser = ? AND idDocument = ? AND view_at >= ? AND view_at <= NOW()`, 
                                                    [idUser, idDocument, formattedToday]);
        
        if (existingView.length < 1){
            const view = { idUser, idDocument };
            await connection.query('INSERT INTO views_log SET ?', view);
            await connection.query('UPDATE documents SET views = views + 1 WHERE idDocument = ?', [idDocument]);
        }

        res.json("Success!!");
    } catch (error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getViewsByWeekDayByUser = async (req,res) => {
    try{
        const connection = await getConnection();
        const {idUser} = req.params;

        const today = new Date();
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - (today.getDay() + 6) % 7);
        const lastMondayFormatted = lastMonday.toISOString().split('T')[0];

        const query = await connection.query(
        `SELECT 
            daysOfWeek.weekday,
            COALESCE(COUNT(view_at),0) as total_views
        FROM 
            (SELECT 'Monday' as weekday
            UNION SELECT 'Tuesday'
            UNION SELECT 'Wednesday'
            UNION SELECT 'Thursday'
            UNION SELECT 'Friday'
            UNION SELECT 'Saturday'
            UNION SELECT 'Sunday') as daysOfWeek
        LEFT JOIN 
            views_log
        ON 
            daysOfWeek.weekday = DAYNAME(view_at) AND view_at >= '${lastMondayFormatted}' AND idUser = ?
        GROUP BY 
            daysOfWeek.weekday
        ORDER BY 
            FIELD(daysOfWeek.weekday, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');`, idUser);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getViewsByWeekDay = async (req,res) => {
    try{
        const connection = await getConnection();

        const today = new Date();
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - (today.getDay() + 6) % 7);
        const lastMondayFormatted = lastMonday.toISOString().split('T')[0];

        const query = await connection.query(
        `SELECT 
            daysOfWeek.weekday,
            COALESCE(COUNT(view_at),0) as total_views
        FROM 
            (SELECT 'Monday' as weekday
            UNION SELECT 'Tuesday'
            UNION SELECT 'Wednesday'
            UNION SELECT 'Thursday'
            UNION SELECT 'Friday'
            UNION SELECT 'Saturday'
            UNION SELECT 'Sunday') as daysOfWeek
        LEFT JOIN 
            views_log
        ON 
            daysOfWeek.weekday = DAYNAME(view_at) AND view_at >= '${lastMondayFormatted}'
        GROUP BY 
            daysOfWeek.weekday
        ORDER BY 
            FIELD(daysOfWeek.weekday, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');`);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const deleteFile = async (req, res) => {
    try {
        const {idDocument} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM documents WHERE idDocument = ?", idDocument)

        res.json(query)
    } catch(error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const addReport = async (req,res) => {
    try {
        const connection = await getConnection();     
        const { idUser, id, description } = req.body;
        
        if(description === '')
            return res.status(500).json({message: "Fill all fields"})

        const report = {idUser, idDocument: id, description}
        await connection.query(`INSERT INTO reports_log SET ?`, report);

        res.json("Success!!");
    } catch (error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const deleteReport = async (req, res) => {
    try {
        const {idReport} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM reports_log WHERE idReport = ?", idReport)

        res.json(query)
    } catch(error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getReports = async (req,res) => {   

    try{
        const connection = await getConnection();
     
        const query = await connection.query(`SELECT r.idReport, r.idUser, d.idDocument, d.title, d.idCategory, r.description
                                                FROM reports_log r LEFT JOIN documents d ON r.idDocument = d.idDocument
                                                ORDER BY r.created_at DESC;`);

        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getFileCountLastWeek = async (req, res) => {
    try {
        const connection = await getConnection()

        const fileCount = await connection.query(`SELECT COUNT(idDocument) as fileCount FROM documents WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`)

        res.json(fileCount)
    } catch (error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getReportCountLastWeek = async (req, res) => {
    try {
        const connection = await getConnection()

        const reportCount = await connection.query(`SELECT COUNT(idDocument) as reportCount FROM reports_log WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`)

        res.json(reportCount)
    } catch (error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getFileCountByCategory = async (req, res) => {
    try {
        const connection = await getConnection()

        const categoryCount = await connection.query(`SELECT 
                                                    CASE 
                                                        WHEN d.idCategory <= 6 THEN c.name
                                                        ELSE 'Código'
                                                    END as name,
                                                    COUNT(d.idCategory) as total_files
                                                FROM 
                                                    categories c
                                                LEFT JOIN 
                                                    documents d ON c.idCategory = d.idCategory
                                                GROUP BY 
                                                    CASE 
                                                        WHEN d.idCategory <= 6 THEN c.name
                                                        ELSE 'Código'
                                                    END;`)

        res.json(categoryCount)
    } catch (error) {
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getFiles,
    getFileById,
    addFile,
    addCode,
    getFilesBySubjectId,
    getFilesByUserId,
    addViewLog,
    getViewsByWeekDayByUser,
    getViewsByWeekDay,
    deleteFile,
    addReport,
    deleteReport,
    getReports,
    getFileCountLastWeek,
    getReportCountLastWeek,
    getFileCountByCategory
};