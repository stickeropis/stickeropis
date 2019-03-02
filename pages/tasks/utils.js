export default function groupByKey(key, tasks) {
    const result = new Map();

    for (const task of tasks) {
        result.set(task[key], 0);
    }

    return [...result.keys()];
}
