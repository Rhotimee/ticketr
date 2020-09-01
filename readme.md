#### Install NGINX Ingress Controller
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.35.0/deploy/static/provider/cloud/deploy.yaml`

#### Install Skaffold https://skaffold.dev/
`brew install skaffold`


#### Add JWT secret
`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`

#### Run 
`skaffold dev`