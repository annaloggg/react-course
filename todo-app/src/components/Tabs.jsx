export function Tabs({todos}) {
    
    const tabs = ['All' , 'Open', 'Completed'];
    return (
        <nav className="tab-container">
            {tabs.map((tab, tabIndex) => {

                const numofTasks = tab === 'All' ?
                    todos.length :
                    tab === 'Open' ?
                    todos.filter(val => !val.complete).length
                    : todos.filter(val => val.complete).length

                return (
                    <button className="tab-button" key={tabIndex}>{tab}
                    <span> ({numofTasks})</span></button>
                )
            })}
        </nav>
    )
}