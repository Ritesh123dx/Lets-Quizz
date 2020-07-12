import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/style.css";
import fetchQuestions from './quizService/index';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';



class QuizBee extends Component{
    constructor(props){
        super(props);

        this.state = {
            questionBank : [],
            score : 0,
            response : 0,
            numberOfQuestions : null,
            submit : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    getQuestion = (n) => {
        fetchQuestions(n).then(question => {
            this.setState({
                questionBank : question
            })
        })
    }

    computeAnswer = (answer, correctAnswer) => {
        
        if(answer === correctAnswer)
            this.setState(prevState=>({score : prevState.score + 1}))
      
    }

    // componentDidMount(){
    //     this.getQuestion();
    // }

    playAgain = () => {
        // this.getQuestion();
        this.setState({
            score : 0,
            response : 0,
            submit : false
        })
    }

    handleChange(event) {
        this.setState({numberOfQuestions: parseInt(event.target.value)});
      }
    
      handleSubmit(event) {
        
        this.getQuestion(this.state.numberOfQuestions);
        this.setState({
            submit : true
        });

        event.preventDefault();
      }

    render(){
       var response = this.state.response;
       var element = this.state.questionBank;
        return (
            <div className="container py-5 text-center">
                <div className='bg-dark text-light rounded p-3'><h2>Lets Quizz</h2></div>
                
                 <div className="shadow rounded p-5" >
                    {this.state.submit === false ? 
                    <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>
                      <h3>Number of Questions:</h3>
                      <input className="form-control" type="number" min="1" max="10" value={this.state.numberOfQuestions} onChange={this.handleChange} />
                    </label><br />
                    <input className="btn btn-primary" type="submit" value="Submit" />
                  </form> : null}

                {this.state.response < this.state.numberOfQuestions && this.state.questionBank.length > 0 && this.state.submit !== false ? (<>
                
                    <QuestionBox 
                    questionNumber={this.state.response + 1}
                    question={element[response].question}
                    options={element[response].answers}
                    key={element[response].questionId}
                    selected={answer => this.computeAnswer(answer,element[response].correct)}
                    />
                    <button className="btn btn-info btn-lg mt-3" onClick={() => this.setState({
                        response : this.state.response + 1}
                    ) }>Next</button>
                    </>) : null }

                    {this.state.response == this.state.numberOfQuestions ? <Result score={this.state.score} numberOfQuestions={this.state.numberOfQuestions} playAgain={this.playAgain}/> : null}
                    </div>

            </div>
        )
    }
}

ReactDOM.render(<QuizBee />,document.getElementById('root'));