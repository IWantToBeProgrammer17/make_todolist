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
}

module.exports = new ChatbotModel;
