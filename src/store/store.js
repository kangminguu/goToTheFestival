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

const date = new Date();
const year = `${date.getFullYear()}`;
const month = `${date.getMonth() + 1}`.padStart(2, "0");
const day = `${date.getDate()}`.padStart(2, "0");
const today = year + month + day;

/** 검색 페이지 조건 */
const useSearchPageStore = create((set) => ({
    region: 0, // 지역
    setRegion: (state = 0) => set({ region: state }),

    startDate: today, // 시작 날짜
    setStartDate: (state = today) => set({ startDate: state }),

    endDate: today, // 끝 날짜
    setEndDate: (state = today) => set({ endDate: state }),

    keyword: "", // 검색 키워드
    setKeyword: (state = "") => set({ keyword: state }),
}));

/** 검색 스탭 상태 */
const useSearchTabStore = create((set) => ({
    isTab: false,
    setIsTab: (state) => set({ isTab: state }),

    searchTab: "날짜",
    setSearchTab: (state) => set({ searchTab: state }),
}));

/** 탭 메뉴 상태 */
const useTabMenuStore = create((set) => ({
    tab: "home",
    setTab: (state) => set({ tab: state })
}));

/** 상세 페이지 인지 상태 */
const useIsDetailPageStore = create((set) => ({
    isDetailPage: false,
    setIsDetailPage: (state) => set({ isDetailPage: state })
}));

/** 클릭된 축제 정보 */
const useFestivalInfoStore = create((set) => ({
    festivalInfo: {},
    setFestivalInfo: (state) => set({ festivalInfo: state }),
}));

/** 찜 목록 상태 */
const useWishListStore = create((set) => ({
    wishList: JSON.parse(localStorage.getItem("wishList")) || [],

    // 찜 목록에 추가
    addWishList: (newItem) => set((state) => {
        // 기존 배열에 추가
        const newWishList = [...state.wishList, newItem];

        localStorage.setItem("wishList", JSON.stringify(newWishList));

        return { wishList: newWishList };
    }),

    // 찜 목록에서 삭제
    deleteWishList: (deleteItem) => set((state) => {
        // 기존 배열에 contentid를 비교해서 삭제할 contentid와 같지 않은 것만 필터링
        const newWishList = [...state.wishList].filter(wish => wish.contentid !== deleteItem.contentid)

        localStorage.setItem("wishList", JSON.stringify(newWishList));

        return { wishList: newWishList };
    }),
}));

export {
    useSelectedRegion,
    useLoadingStore,
    useFestivalListStore,
    useTabMenuStore,
    useWishListStore,
    useFestivalInfoStore,
    useIsDetailPageStore,
    useSearchPageStore,
    useSearchTabStore
};