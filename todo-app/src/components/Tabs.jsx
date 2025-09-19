import { useContext } from "react";
import { CurrentTabContext, TodosContext } from "../App";

export function Tabs() {

    const { currentTab, setCurrentTab } = useContext(CurrentTabContext);
    const {todos} = useContext(TodosContext);

    const tabs = ['All', 'Open', 'Completed'];
    return (
        <nav className="tab-container">
            {tabs.map((tab, tabIndex) => {

                const numofTasks = tab === 'All' ?
                    todos.length :
                    tab === 'Open' ?
                        todos.filter(val => !val.completed).length
                        : todos.filter(val => val.completed).length

                return (
                    <button className={"tab-button " + (tab == currentTab ? 'tab-selected' : '')} onClick={() => {
                        setCurrentTab(tab);
                    }} key={tabIndex}>{tab}
                        <span> ({numofTasks})</span></button>
                )
            })}
            <hr/>
        </nav>
    )
}