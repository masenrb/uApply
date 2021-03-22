
import "./ApplicationCard.scss";

const ApplicationCard = (props) => {

    /*TEMP */
    let propsdes = 'Description is here ahdfjas a lkjdf kas fks ajfdkl asjfdkl jasfk asklfj daslkdfj asdkljf';
    let propstitle= 'Description';

    return (
        <div className={`application-card-${props.width} height-${props.height} float-${props.float}`}>
            <div className="header_container">
                <div className="header_text">
                    <h6>{props.title}</h6>
                </div>
            </div>
            <div className='description_container'>
                    {/* change descript_size in class for diff length */}
                    <div className="descript_text">
                        {props.children}
                    </div>
            </div>
            
        </div>
        
    )
}

export default ApplicationCard;