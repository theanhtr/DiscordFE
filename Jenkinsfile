pipeline{
  agent{
    label 'jenkins-agent'
  }
  tools{
    nodejs 'Node20'
  }
  stages{
    stage('Cleanup workspace'){
      steps{
        cleanWs()
      }
    }
    
    stage('Checkout'){
      steps{
        git branch: 'master', credentialsId: 'git-credentials', url: 'https://github.com/theanhtr/DiscordFE.git'
      }
    }

    stage('Install dependencies'){
      steps{
        sh 'npm install'
      }
    }

    stage('Build'){
      steps{
        sh 'npm run build'
      }
    }

    stage('sonarqube'){
      steps{
        script{
          withSonarQubeEnv(credentialsId: 'sonarqube-credentials') {
            sh 'sonar-scanner'
          }
        }
      }
    }
  }
}