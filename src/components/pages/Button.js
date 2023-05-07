const Button = ({ color,text, onClick }) => {
    return <button onClick={onClick} style={{ backgroundColor: color }} type="button" className="btn btn-primary pull-right">{text}</button>
}

export default Button