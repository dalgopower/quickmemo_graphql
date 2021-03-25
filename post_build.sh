#!/bin/bash

# Must run after `tsc`

# pre_build.sh에 의해 지워졌다는 가정하에
mkdir ./build/graphql

cp src/graphql/schema.graphql ./build/graphql