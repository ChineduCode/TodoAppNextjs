'use client'

import { useEffect, useState } from "react"

export default function Todo(){
    const [todos, setTodos] = useState([])
    
    useEffect(()=> {
        async function fetchTodos(){
            const response = await fetch(`/api/todo`)
            const data = await response.json()
            setTodos(data)
            console.log(todos)
        }

        fetchTodos()
    }, [])

    async function handleCompleted(id){
        const res = await fetch(`/api/todo?id=${id}`, {
            method: 'PUT'
        })

        if(res.ok){
            console.log(`todo deleted`)
        }else {
            throw new Error('error deleting todo')
        }
    }

    async function handleDelete(id){
        console.log(id)
        const res = await fetch(`/api/todo?id=${id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            console.log(`todo deleted`)
        }else {
            throw new Error('error deleting todo')
        }
    }

    function deleteAllCompleted(){
        console.log('all completed deleted')
    }
    
    function getAll(){
        console.log('All')
    }
    
    function filterActive(){
        console.log('Active')
    }
    
    function filterCompleted(){
        console.log('Completed')
    }
    
    // //filter and get the length of todo.completed === false 
    // const notCompleted = todos.filter(todo => !todo.completed)
    const notCompleted = 'notcomplete'

    return(
        <section className="todos_container">
            <div className="todos">
                { todos.map((todo, index) => 
                    <div className="todo" key={index}>
                        <div className={`left ${todo.completed ? 'completed' : 'left'}`}>
                            <span className="checkbox" onClick={() => handleCompleted(todo._id)}>
                                <img src="./icon-check.svg" alt="check" className="icon-check"/>
                            </span>
                            <span className="text">{todo.text}</span>
                        </div>
                        <img src="./icon-cross.svg" alt="cross" className="icon-cross" onClick={()=> handleDelete(todo._id)}/>
                    </div> 
                )}
            </div>

            <div className="bottom">
                <span className="items_left">{notCompleted.length} items left</span>
                    <div className="filter">
                        <span className="all" onClick={getAll}>All</span>
                        <span className="active" onClick={filterActive}>Active</span>
                        <span className="completed" onClick={filterCompleted}>Completed</span>
                    </div>
                <span className="clear_completed" onClick={deleteAllCompleted}>Clear Completed</span>
            </div>
        </section>
    )
}
