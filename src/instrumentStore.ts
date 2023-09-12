import { create } from 'zustand';

interface InstrumentQuery {
    instruName?: string;
    // ... other properties if needed.
}

interface instrumentQueryStore {
    instrumentQuery: InstrumentQuery;
    setInstruName: (instruName: string) => void;
    // ... other setters if needed.
}

const useInstrumentQueryStore = create<instrumentQueryStore>((set) => ({
    instrumentQuery: { instruName: "" },  // Default instruName value is empty.
    setInstruName: (instruName) => {
        set((store) => {
            return {
                ...store,
                instrumentQuery: { ...store.instrumentQuery, instruName }
            };
        });
    }
    // ... other setters if needed.
}));

export default useInstrumentQueryStore;