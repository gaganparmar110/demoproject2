def project_name = 'instantinput-cms'
def deploy_path = "/srv/www/react/${project_name}"
def production_branch = 'master'
def development_branch = 'development'
def agentName = 'instantinput'
def ip_address = '3.141.208.24'
def user = "ubuntu"

def nginx_path = "/home/ubuntu/docker-stack/nginx_conf/react"
if (env.BRANCH_NAME == "${development_branch}")
{
  agentName = 'jenkins_deploy_new'
  ip_address = "stage.openxcell.dev"
  user = "ubuntu"
}
if (env.BRANCH_NAME == "${production_branch}")
{
  deploy_path = "/usr/share/nginx/html/cms"
}

pipeline {
    agent {
      label 'ec2-fleet'
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: "7"))
    }
    
    stages {
        stage ("prechecks") {
            steps {
            sh "mkdir -p ./tmp/${project_name}"
            }
        }
        stage("Build")
        {
        	agent {
		        docker {
		            image "node:12-alpine"
                    label 'ec2-fleet'
		        }
		    }
            steps
            {   
                sh "npm install"
                script {
                        sh "mv .env.${env.BRANCH_NAME} .env"
                        sh "npm run --silent build"
                        stash includes: 'build/**/*', name: 'BUILD'
                }
            }
        }

        stage("Deploy")
        {
            steps
            {
                script {
                    unstash 'BUILD'
                    if (env.BRANCH_NAME == "${development_branch}" && env.NODE_LABEL != "master")
                    {
                        sshagent ( ["${agentName}"]) {
                           sh "ls build"   
                           sh "rsync -avrHP -e 'ssh -o StrictHostKeyChecking=no' --delete build/ ${user}@${ip_address}:${deploy_path}"
                           sh """
                            ssh ${user}@${ip_address} "curl -sSLk https://gitlab.orderhive.plus/-/snippets/2/raw | sed 's%__PROJECT_NAME__%${project_name}%g' > ${nginx_path}/${project_name}.conf"
                           """
                            sh "docker system prune -f"
                        }
                    }
                    else if (env.BRANCH_NAME == "${production_branch}" && env.NODE_LABEL != "master" )
                    {   
                        sshagent ( ["${agentName}"]) {
                            sh "ls build"
                            sh "rsync -avrHP -e 'ssh -o StrictHostKeyChecking=no' --delete build/ ${user}@${ip_address}:${deploy_path}"
                            sh "docker system prune -f"
                        }
                    }
                }
            }
        }
    }
    post { 
        always { 
            node('ec2-fleet') {
                cleanWs()   
            }
        }


    }
}
