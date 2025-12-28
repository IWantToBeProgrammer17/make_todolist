export default function ChatbotBox(props: { chatid: string}) {
    return (
        <div className="flex-1 shrink-0 overflow-auto p-3 bg-white">
            <p>Chatbox: {props.chatid}</p>
            {/* bikin ui chat disini */}
        </div>
    );
}