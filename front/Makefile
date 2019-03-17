IMAGE_NAME = automaton_web
CONTAINER_NAME = automaton_web
SCRIPT_FOLDER = `pwd`

.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .

.PHONY: serve
serve:
	docker run \
		--rm -it --init \
		-p 8080:8080 \
		-v $(SCRIPT_FOLDER)/src:/var/app/src \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		npm run serve

.PHONY: bundle
bundle:
	docker rm $(CONTAINER_NAME) || true
	docker run \
		-it --init \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		npm run build
	docker cp $(CONTAINER_NAME):/var/app/dist .bundle
