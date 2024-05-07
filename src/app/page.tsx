'use client'
import React, { useState, useMemo, useEffect } from "react";
import "@/app/globals.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { title: taskInput.trim(), isdone: false }]);
      setTaskInput("");
      setShowPopup(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleToggleAllTasks = () => {
    const updatedTasks = tasks.map(task => ({ ...task, isdone: true }));
    setTasks(updatedTasks);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "Ativas":
        return tasks.filter((task) => !task.isdone);
      case "Completas":
        return tasks.filter((task) => task.isdone);
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  const remainingTasksCount = useMemo(() => {
    return tasks.filter((task) => !task.isdone).length;
  }, [tasks]);

  const completedTasksCount = useMemo(() => {
    return tasks.filter((task) => task.isdone).length;
  }, [tasks]);
  
  const totalTasksCount = tasks.length;
  const progressPercentage = totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100;

  const remainingTasksText = remainingTasksCount === 1 ? "item restante" : "itens restantes";

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#fefefe] overflow-auto">
      <div className="w-[28.8125rem] flex flex-col items-center">
        {showPopup && (
          <div className=" absolute top-[10%] border-[0.125rem] border-[#de6c5c] w-fit p-[0.5rem] rounded-[0.5rem] mb-[1rem]">
            <span className="text-[#de6c5c]">✓ Nova tarefa adicionada</span>
            <button className="ml-[0.5rem] text-[#de6c5c] font-bold" onClick={() => setShowPopup(false)}>X</button>
          </div>
        )}
        <div className="h-[3.5rem] flex items-center m-[0.5rem]">
          <p className="flex items-center justify-center-[13.0625rem] text-[3rem] text-[#de6c5c]">PraFazê!</p>
          <div className="w-[3.5rem] h-[3.5rem] flex items-center justify-center">
            <img className="h-[3rem]" src="./reallogo.svg" alt="Logo"/>
          </div>
        </div>
        <div className="min-h-[35rem] w-[28.8125rem] border-[#de6c5c] border-[0.0625rem] rounded-[0.75rem] pt-[0.75rem] pr-[0.75rem] pl-[0.75rem] flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="border-[0.125rem] w-[20.4375] h-[3rem] border-[#de6c5c] flex items-center p-[0.5rem] rounded-[0.5rem] justify-between shadow">
              <input className="w-[16.4375rem] h-[1.5rem] outline-none text-[#de6c5c] placeholder-[#de6c5c] bg=[#fefefe]" type="text" placeholder="Sou uma tarefa :)" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} onKeyPress={handleKeyPress}/>
              <button type="button" className="rounded-[0.5rem] w-[2rem] h-[2rem] border-[0.0625rem] border-[#de6c5c] text-[#de6c5c] text-fill overflow-hidden whitespace-nowrap text-[0.65rem] flex items-center justify-center shadow" onClick={handleAddTask}>Add</button>
            </div>
            <button className="w-[5.375rem] bg-[#de6c5c] text-[#fefefe] rounded-[0.5rem] text-fill shadow" onClick={handleToggleAllTasks}>Feito!</button>
          </div>
          <div className="mt-[0.5rem] h-[0.5rem] w-[27.3125rem] border-[#de6c5c] border-[0.0625rem] rounded-[0.25rem] shadow">
            <div className="h-full bg-[#de6c5c] rounded-[0.25rem]" style={{ width: `${progressPercentage}%`}}></div>
          </div>
          <div id="task box" className="w-[27.3125rem] h-[27.5rem] overflow-y-auto scrollbar-thin scrollbar-track-transparent">
            <div className="mt-[0.5rem] mb-[0.5rem] flex flex-col">
              {tasks.length === 0 ? (
                <div className="text-[#de6c5c] max-w-[27.3125rem] min-h-[26rem] flex items-center justify-center">
                  <p className="tex-center items-center">Todas as tarefas foram feitas :D</p>
                </div>
              ) : (
                filteredTasks.map((task, index) => (
                  <div key={index} className="text-[#de6c5c] flex items-center overflow-hidden">
                    <input className="mr-[0.5rem] h-[1rem] w-[1rem] accent-[#de6c5c]" type="checkbox" checked={task.isdone} onChange={() => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].isdone = !updatedTasks[index].isdone;
                      setTasks(updatedTasks);
                    }}/>
                    <div className="w-[27.3125rem] text-ellipsis overflow-hiden">
                      <p className={` ${task.isdone ? "line-through" : ""} text-ellipsis overflow-hidden`}>{task.title}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex justify-between items-center border-t-[0.0625rem] border-t-[#de6c5c] h-[3rem]">
            <div className="w-[6rem] h-[1.125rem] flex items-center">
              <p className="text-[0.75rem] text-[#de6c5c] whitespace-nowrap">{remainingTasksCount} {remainingTasksText}</p>
            </div>
            <div className="text-[0.75rem] w-[10rem] flex justify-between text-[#de6c5c]">
              <button className={`text-sm ${activeFilter === "Tudo" ? "font-bold" : ""}`} onClick={() => handleFilterClick("Tudo")}>Tudo</button>
              <button className={`text-sm ${activeFilter === "Ativas" ? "font-bold" : ""}`} onClick={() => handleFilterClick("Ativas")}>Ativas</button>
              <button className={`text-sm ${activeFilter === "Completas" ? "font-bold" : ""}`} onClick={() => handleFilterClick("Completas")}>Completas</button>
            </div>
            <button className="text-[0.75rem] text-[#de6c5c]" onClick={() => setTasks(tasks.filter(task => !task.isdone))}>Limpar Completas</button>
          </div>
        </div>
      </div>
    </div>
  );
}
