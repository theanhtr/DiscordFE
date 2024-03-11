pipeline{
  agent{
    label 'jenkins-agent'
  }
  tools{
    nodejs 'Node20'
  }
  environment {
    APP_NAME = "discord_fe"
    RELEASE = "1.0.1"
    DOCKER_USER = "theanh0906"
    DOCKER_PASS = "dockerhub-credentials"
    IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
    IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
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

    stage("Build and push docker image"){
      steps{
        script{
          docker.withRegistry('', DOCKER_PASS) {
            docker_image = docker.build("${IMAGE_NAME}")
          }

          docker.withRegistry('', DOCKER_PASS) {
            docker_image.push("${IMAGE_TAG}")
          }
        }
      }
    }
  }
}