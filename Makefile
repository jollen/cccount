TESTS = $(shell find tests/test.*.js)

test:
	@./tests/run $(TESTS)

.PHONY: test