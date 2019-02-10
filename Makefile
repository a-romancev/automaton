IMAGE_NAME = automaton_web
CONTAINER_NAME = automaton_web
SCRIPT_FOLDER = `pwd`


build:
	docker build -t $(IMAGE_NAME) .

run-cli:
	docker build -t $(IMAGE_NAME) .
	docker run \
		--rm -it --init \
		-v $(SCRIPT_FOLDER)/vue/:/var/app/ \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		vue create automaton
