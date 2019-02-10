IMAGE_NAME = automaton_web
CONTAINER_NAME = automaton_web
SCRIPT_FOLDER = `pwd`


build:
	docker build -t $(IMAGE_NAME) .

serve:
	docker run \
		--rm -it --init \
		-p 8080:8080 \
		-v $(SCRIPT_FOLDER)/src:/var/app/src \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		npm run serve
