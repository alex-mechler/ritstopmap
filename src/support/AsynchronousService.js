import _ from 'lodash'

export default function(klass, ...dependencies) {
    return container => {
        const resolvedDependencies = _.map(dependencies, dependency => {
            return container[dependency];
        });

        return klass.make.apply(null, resolvedDependencies);
    }
}