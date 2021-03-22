
import "./ApplicationCard.scss";

const ApplicationCard = (props) => {

    /*TEMP */
    let propsdes = 'Description is here';
    let propstitle= 'Description';

    return (
        
        <div>
            <div className="header_container">
                <div className="header_text">
                    <h6>{propstitle}</h6>
                </div>
            </div>
            <div className="description_container">
                <div className="descript_size"> 
                    {/* change descript_size in class for diff length */}
                    <div className="descript_text">
                        <h6>{propsdes}</h6>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default ApplicationCard;