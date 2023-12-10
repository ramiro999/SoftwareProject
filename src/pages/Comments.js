import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import TaskCard from "../components/TaskCard";

export default function Comments() {

    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Backlog", src: "User", gap: true },
        { title: "Planificador ", src: "Calendar" },
        { title: "Cronograma", src: "Search" },
        { title: "Comentarios", src: "Chart" },
        { title: "Configuraciones", src: "Setting", gap: true },
    ];
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            const currentDate = new Date().toLocaleDateString();
            const newCommentObject = {
                id: Date.now(),
                text: newComment,
                author: 'Prot3o', //nombre de usuario hay que rescatarlo de la base de datos
                date: currentDate,
            };
            setComments([...comments, newCommentObject]);
            setNewComment('');
        }
    };
    const handleDeleteComment = (commentId) => { //elimina comentarios 
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="h-screen flex-1 bg-sextarian">
                <h1 className="text-2xl text-white font-semibold bg-primary p-5">Proyecto</h1>
                <div className="bg-sextarian p-8">
                    <h2 className="text-3xl font-bold mb-4">Comentarios</h2>

                    <div className="flex flex-wrap -mx-2">
                        {comments.map((comment) => (
                            <div key={comment.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                                <div className="bg-white p-4 rounded shadow relative overflow-auto">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <div className="w-7 bg-gray-300 rounded-full mr-2">
                                                <img src="assets/user.png" alt="" />
                                            </div>
                                            <p className="font-bold">{comment.author}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="w-7 text-red-500 cursor-pointer"
                                        >
                                            <img src="assets/trash.png" alt="" />
                                        </button>
                                    </div>
                                    <p className="text-gray-800">{comment.text}</p>
                                    <p className="text-sm text-gray-500 mt-2 text-right">{comment.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Añade un comentario..."
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={handleAddComment}
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Agregar comentario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
