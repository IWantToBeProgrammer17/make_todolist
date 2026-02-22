const moment = require('moment');
const { connectToDB } = require('.');

class ChatbotModel {
    async getChats(userId) {
        
        const connection = await connectToDB();

        const [chats] = await connection.query(`
            SELECT * FROM chats WHERE user_id = ?`, 
            [userId]
        );

        await connection.end();
    
        return chats;
        
    }
    async createChat(chatData) {
        const user_id = chatData.user_id;
        const title = chatData.title || 'New Chat';

        const connection = await connectToDB();

        const [result] = await connection.query(`
            INSERT INTO chats (user_id, title) VALUES (?, ?)`, 
            [user_id, title]
        );
        await connection.end();
        return {
            id: result.insertId,
            user_id,
            title,
        };
    }
    async getChat(chatId){
        const connection = await connectToDB();

        const [messages] = await connection.query(`
            SELECT 
            * FROM messages WHERE chat_id = ?`, 
            [chatId]
        );
        
        return messages;
    }
   async insertMessage({chatId, type, content}) {
        const connection = await connectToDB();

        const [insertMessage] = await connection.query(`
            INSERT INTO messages (chat_id, type, content) 
            VALUES (?, ?, ?)`, 
            [chatId, type, content]
        );

        if (insertMessage.affectedRows > 1) {
            return true
        }

        return false;
   } 
   async updateHistoryChat({user_id}) {
        const connection = await connectToDB();
    
        const [checkLimit] = await connection.query(`
            SELECT id, user_id, last_time_chat, count_chat FROM chat_limits WHERE user_id = ?`,
            [user_id]
        );
        if (checkLimit.length === 0) {
            await connection.query(`
                INSERT INTO chat_limits (user_id, last_time_chat, count_chat) VALUES (?, ?, ?)`,
                [user_id, moment().format('YYYY-MM-DD HH:mm:ss'), 1]
            );
        } else {
            await connection.query(`
                UPDATE chat_limits SET last_time_chat = ?, count_chat = ? WHERE user_id = ?`,
                [moment().format('YYYY-MM-DD HH:mm:ss'), 
                (checkLimit[0]?.count_chat || 0) + 1, 
                user_id,
            ]);
        }
    }
}

module.exports = new ChatbotModel;
