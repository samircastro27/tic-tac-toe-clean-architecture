import { Ref, computed } from "vue";
import { Mark } from "../../domain/values/tile.value";

export function useMarkColor(mark: Ref<Mark>) {
    const textColor = computed(() => {
        if(mark.value == "") return "text-terciary";
        return mark.value == "X"
            ? "text-red-400"
            : "text-blue-400"
    });

    const cardColor = computed(() => {
        if (mark.value == "") return "bg-primary border-terciary/5 hover:outline-secondary-400 focus:outline-secondary-300";
        return mark.value == "O" 
        ? "bg-blue-400 text-white focus:outline-sky-300 hover:outline-sky-300" 
        : "bg-red-400 text-white border-white focus:outline-red-300 hover:outline-red-300"
    });

    return { textColor, cardColor };
};