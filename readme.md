#### Install NGINX Ingress Controller
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.35.0/deploy/static/provider/cloud/deploy.yaml`

#### For DEV Install Skaffold https://skaffold.dev/
`brew install skaffold`


#### Add JWT secret
- `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=$whatever`
- `kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=$whatever`

### Setup Ingres Nginx
- `https://kubernetes.github.io/ingress-nginx/deploy`

#### Run 
`skaffold dev`

##### Project inspired by https://www.udemy.com/course/microservices-with-node-js-and-react