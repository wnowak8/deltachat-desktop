pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                echo 'Building'
                sh 'npm run build'
            }
            post {
                failure {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'nwiktoria0520@gmail.com',
                        subject: "Build failed in Jenkins Job ${env.JOB_NAME}"
                    sh 'false'
                }
                success {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'nwiktoria0520gmail.com',
                        subject: "Successful build in Jenkins Job ${env.JOB_NAME}"
                }
            }
        }
        stage('Test') { 
            steps {
                echo 'Testing'
                sh 'npm run test'
            }
            post {
                failure {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'nwiktoria0520gmail.com',
                        subject: "Tests failed in Jenkins Job ${env.JOB_NAME}"
                    sh 'false'
                }
                success {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'nwiktoria0520@gmail.com',
                        subject: "Successful tests in Jenkins Job ${env.JOB_NAME}"
                }
            }
        }
        
    }
}
