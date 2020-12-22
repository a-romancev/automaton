
.PHONY: bundle
bundle:
	cd ./front && make bundle
	rm -r .bundle | true
	mv ./front/.bundle .bundle

.PHONY: start
start:
	docker-compose up

.PHONY: stop
stop:
	docker-compose down
