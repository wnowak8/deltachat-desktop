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
                        to: 'wnowak0520@gmail.com',
                        subject: "Build failed in Jenkins Job ${env.JOB_NAME}"
                    sh 'false'
                }
                success {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'wnowak0520@gmail.com',
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
                        to: 'wnowak0520@gmail.com',
                        subject: "Tests failed in Jenkins Job ${env.JOB_NAME}"
                    sh 'false'
                }
                success {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'wnowak0520@gmail.com',
                        subject: "Successful tests in Jenkins Job ${env.JOB_NAME}"
                }
            }
        }
        stage('Deploy') { 
            steps {
                echo 'Deploying'
                sh 'docker build -t deltachat -f docker/Dockerfile.deploy .'
            }
            post {
                failure {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'wnowak0520@gmail.com',
                        subject: "Deploy failed in Jenkins Job ${env.JOB_NAME}"
                    sh 'false'
                }
                success {
                    emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                        to: 'wnowak0520@gmail.com',
                        subject: "Successful deploy in Jenkins Job ${env.JOB_NAME}"
                }
            }
        }
    }
    post {
        failure {
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                to: 'wnowak0520@gmail.com',
                subject: "Build failed in Jenkins ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
        success {
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                to: 'wnowak0520@gmail.com',
                subject: "Successful build in Jenkins ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
    }
}
