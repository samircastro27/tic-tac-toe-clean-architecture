import { computed, onUnmounted, ref } from "vue";

export interface TimeFormat {
    millis: string;
    seconds: string;
    minutes: string;
}

export function useTimer(updateMillis: number = 0) {
    let interval = -1;
    const startTime = ref(0);
    const endTime = ref(0);
    const elapsed = ref(0);
    const hasStarted = ref(false);
    const finished = ref(false);

    const start = () => {
        if(finished.value) return;
        hasStarted.value = true;
        startTime.value = Date.now();
        interval = setInterval(() => {
            elapsed.value = Date.now() - startTime.value;
        }, updateMillis);
    };

    const stop = () => {
        if(finished.value) return;
        if (!hasStarted.value) {
            startTime.value = Date.now();
            endTime.value = startTime.value;
            elapsed.value = 0;
        }
        else {
            endTime.value = Date.now()
            elapsed.value = endTime.value - startTime.value;
            clearInterval(interval);
        }
        finished.value = true;
    };

    function pad(n: number, power: number = 1): string {
        const limit = Math.pow(10, power);
        let padding = '';
        let powLength = limit.toString().length;
        for (let i = 0; i < powLength - 1; i++) {
            padding += '0';
        }
        return n < limit ? `${padding}${n}` : n.toString();
    }

    const formatted = computed<TimeFormat>(() => {

        const millis = elapsed.value % 1000;
        const seconds = Math.floor((elapsed.value / 1000) % 60);
        const minutes = Math.floor((elapsed.value / 1000 / 60) % 60);

        return {
            millis: pad(millis, 2).substring(0, 3),
            seconds: pad(seconds).substring(0, 2),
            minutes: pad(minutes).substring(0, 2)
        };
    })

    onUnmounted(() => {
        stop();
    })

    return { startTime, endTime, elapsed, formatted, start, stop, hasStarted, finished };
}