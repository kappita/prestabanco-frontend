pipeline {
  agent any


  stages {
    stage('Checkout repository') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1']])
            }
        }


    stage('Build frontend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t kappappita/prestabanco-frontend:latest .'
                    } else {
                        bat 'docker build -t kappappita/prestabanco-frontend:latest'
                    }
                }

                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    script {
                        if (isUnix()) {
                            sh 'docker login -u kappappita -p $dhpsw'
                        } else {
                            bat 'docker login -u kappappita -p %dhpsw%'
                        }
                    }
                }

                script {
                    if (isUnix()) {
                        sh 'docker push kappappita/prestabanco-frontend:latest'
                    } else {
                        bat 'docker push kappappita/prestabanco-frontend:latest'
                    }
                }
            }
        }
  }

}