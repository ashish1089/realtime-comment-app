import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getAllComments() {
    const [rows] = await pool.query(`SELECT * FROM comments ORDER BY timestamp DESC`);
    return rows;
}

export async function getComment(id) {
    const [row] = await pool.query(`SELECT * FROM comments WHERE id = ?`, [id]);
    return row[0]
}

export async function createComment(username, comment) {
    const [result] = await pool.query(`
        INSERT INTO comments (username, comment)
        VALUES (?,?)`, [username, comment]);
    const id = result.insertId;
    return await getComment(id);
}

