import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/style.css";
import fetchQuestions from './quizService/index';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';



class QuizBee extends Component{
    state = {
        questionBank : [],
        score : 0,
        response : 0
    }

    getQuestion = () => {
        fetchQuestions().then(question => {
            this.setState({
                questionBank : question
            })
        })
    }

    computeAnswer = (answer, correctAnswer) => {
        console.log(this.state.score, this.state.response)
        if(answer === correctAnswer)
            this.setState(prevState=>({score : prevState.score + 1}))
        
        this.setState({
            response : this.state.response < 5 ? this.state.response + 1 : 5 
        })
    

    }

    componentDidMount(){
        this.getQuestion();
    }

    playAgain = () => {
        this.getQuestion();
        this.setState({
            score : 0,
            response : 0
        })
    }

    render(){
        return (
            <div className="container">
                <div className='title'>QuizBee</div>
                {this.state.questionBank.length > 0 && this.state.response < 5 && this.state.questionBank.map((element,index) => {
                    return (<QuestionBox questionNumber={index+1} question={element.question} options={element.answers} key={element.questionId} selected={answer => this.computeAnswer(answer, element.correct)} />)
                })}

                {this.state.response === 5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>) : null}
            </div>
        )
    }
}

ReactDOM.render(<QuizBee />,document.getElementById('root'));