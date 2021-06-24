import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './Button_more_less.scss';

const Button_more_less = () => {
    return (
        <div>
            <div className="buttonLess" >Less
                <FontAwesomeIcon icon={faArrowLeft}/>
            </div>

            <div className="buttonMore">More
                <FontAwesomeIcon icon={faArrowRight}/>
            </div>
        </div>
     );
}

export default Button_more_less;