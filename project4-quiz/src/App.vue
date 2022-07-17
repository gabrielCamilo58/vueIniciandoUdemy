<template>
  <div>
    <ScoreBoardVue :winScore="this.winScore" :loseScore="this.loseScore"/>
    <template v-if="this.question">
      <h1 v-html="this.question"></h1>

      <template v-for="(answers, index) in this.answers" :key="index">
        <input 
        :disabled="this.answersSubmited"
        type="radio" 
        name="options" 
        :value="answers"
        id="true"
        v-model="this.answersChoise">

        <label v-html="answers"></label> <br>
      </template>

      <button v-if="!this.answersSubmited" class="send" @click="this.buttomsend()">Enviar</button>
    </template>
   
   <div v-if="this.answersSubmited" class="result">
      <h4 v-if="this.answersChoise === this.correctAnswer" >&#9989; Congratulaitions, the answer {{this.answersChoise}} is correct</h4>
      <h4 v-else>&#10060; Imsorry the correct answer is {{this.correctAnswer}}</h4>
      <button class="send" @click="this.getNextQuestion()">Next question</button>
   </div>
  </div>
</template>


<script>
import ScoreBoardVue from './components/ScoreBoard.vue';
export default {
  name: 'App',
  components: {
    ScoreBoardVue
  },
  data(){
    return{
      correctAnswer: undefined,
      incorrectAnswers: undefined,
      question: undefined,
      correct_answer: undefined,
      answersChoise: undefined,
      answersSubmited: false,
      winScore: 0,
      loseScore: 0
    }

  },
  methods: {
    buttomsend(){
      if(!this.answersChoise){
        alert("escolha em resposta")
      } else{
        this.answersSubmited = true;
        if(this.answersChoise === this.correctAnswer){
          this.winScore ++
        }else{
         this.loseScore ++
        }
      }
    }, getNextQuestion(){
        this.answersChoise = undefined;
        this.answersSubmited = false;
        this.axios.get('https://opentdb.com/api.php?amount=20&category=11').then((response) => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswer = response.data.results[0].correct_answer;
    })
    }
  },
  computed: {
    answers() {
      var answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      console.log(answers.length);
      answers.splice(Math.round(Math.random() * answers.length) , 0, this.correctAnswer);
      return answers;
    }
  },
  created() {
   this.getNextQuestion();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type=radio]{
    margin: 12px 4px;
  }

  button.send{
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: rgb(240, 232, 222);
    background-color: rgb(9, 65, 65);
    border: 1px solid  rgb(9, 65, 65);
    cursor: pointer;
  }
}
</style>
