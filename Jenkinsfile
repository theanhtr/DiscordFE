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
            sh 'npm run sonar'
          }
        }
      }
    }

    stage("Quality Gate"){
      steps{
        script{
          waitForQualityGate abortPipeline: false, credentialsId: 'sonarqube-credentials', timeout: 3000
          def qg = waitForQualityGate()
          if (qg.status != 'OK') {
            error "Pipeline aborted due to quality gate failure: ${qg.status}"
          } else {
            echo 'Quality Gate passed'
          }
        }
      }
    }
  }
}