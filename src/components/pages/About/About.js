import React from 'react';
import styles from './aboutStyle.module.css';
import myImage from './myImage.jpg';

export default function About(props){

    return(
        <div>
            <div className={styles.about}>
                <img src={myImage} className="myImage" alt="myImage" />
                <div className={styles.aboutProject}>
                    <h1>About us</h1>
                    <p> Dear friend! </p>
                    <p> This is a ToDo list project․ You can create tasks and after completing them change the status to "completed". </p>
                    <p>For entering the main page and creating and reviewing tasks registration is needed. </p>
                    <p>To add a new task you should click "Add new task" button, enter task details and fill the deadline. You can use some filters available on the website to find the tasks easily.  </p>
                    <p>You can edit tasks or delete them. By clicking on the task's title you will be directed to task's separate page where all the details of the given task are available. </p>
                    <p>For any question or help you can contact us via Contact us page.  </p>
                    <p>I am Arusyak Gevorgyan, the author of the website. I am a financial specialist. I have a master's degree in finance from ASUE. I have been working in the banking system for about 10 years and have decided to study programming because it always interested me. I have been studying html, css, JavaScript and react.js. This is my first project with React.js on which I have worked for about 3 months. </p>
                </div>
            </div>
        </div>
    );
};