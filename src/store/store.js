import { create } from 'zustand';

const useFestivalListStore = create((set) => ({
    festivalList: [],
    setFestivalList: (state) => set({ festivalList: state })
}));

const useLoadingStore = create((set) => ({
    loading: true,
    setLoading: (state) => set({ loading: state })
}))

const useSelectedRegion = create((set) => ({
    selectedRegion: 0, // "전체"
    setSelectedRegion: (state) => set({ selectedRegion: state })
}));

export { useSelectedRegion, useLoadingStore, useFestivalListStore };