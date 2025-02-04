import { ThemeConsumer } from "./ThemeContext";

function ToggleTheme()
{
    return (
        <ThemeConsumer>
            {({theme, toggleTheme})=>{
                return (
                    <button className="action" onClick={toggleTheme}>
                    {theme === "dark" ?  <i className="bi bi-sun"></i> : <i className="bi bi-moon-stars-fill"></i> }
                    </button>
                );
            }}

        </ThemeConsumer>
    );
}

export default ToggleTheme;

