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
  }
}