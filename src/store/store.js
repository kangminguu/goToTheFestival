import { create } from 'zustand';

/** 축제 리스트 상태 */
const useFestivalListStore = create((set) => ({
    festivalList: [],
    setFestivalList: (state) => set({ festivalList: state })
}));

/** 페이지 로딩중 상태 */
const useLoadingStore = create((set) => ({
    loading: true,
    setLoading: (state) => set({ loading: state })
}));

/** 지역 선택 상태 */
const useSelectedRegion = create((set) => ({
    selectedRegion: 0, // "전체"
    setSelectedRegion: (state) => set({ selectedRegion: state })
}));

/** 탭 메뉴 상태 */
const useTabMenuStore = create((set) => ({
    tab: "home",
    setTab: (state) => set({ tab: state })
}));

/** 찜 목록 상태 */
const useWishListStore = create((set) => ({
    wishList: JSON.parse(localStorage.getItem("wishList")) || [],

    // 찜 목록에 추가
    addWishList: (newItem) => set((state) => {
        const newWishList = [...state.wishList, newItem];

        localStorage.setItem("wishList", JSON.stringify(newWishList));

        return { wishList: newWishList };
    }),

    // 찜 목록에서 삭제
    deleteWishList: (deleteItem) => set((state) => {
        const newWishList = [...state.wishList].filter(wish => wish.contentid !== deleteItem.contentid)

        localStorage.setItem("wishList", JSON.stringify(newWishList));

        return { wishList: newWishList };
    }),
}));

export { useSelectedRegion, useLoadingStore, useFestivalListStore, useTabMenuStore, useWishListStore };