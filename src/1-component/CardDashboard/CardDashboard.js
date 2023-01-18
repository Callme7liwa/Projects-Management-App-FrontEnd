
const CardDashboard = ({handleClick ,  image , description}) => {
    return (
        <div className='card-project project-completed' onClick={handleClick}>
                <div className='left'>
                  <img src={image} alt="" />
                </div>
                <div className='right'>
                    {description}
                </div>
        </div>
    )
}

export default CardDashboard ; 