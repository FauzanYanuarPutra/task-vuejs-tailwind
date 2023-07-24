<template>
  <div class="px-4 sm:px-6 lg:px-8 mb-10">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Recent Calls</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the calls in your account.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add user
        </button>
      </div>
    </div>

    <div class="flex gap-2 w-[100%] my-5">
      <input
        v-model="callIdFilter"
        type="text"
        class="w-[50%] md:w-[30%] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
        placeholder="Search by Call ID"
      />

      <!-- hangup_at filter -->
      <!-- <input
        v-model="hangupAtFilter"
        type="date"
        class="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
        placeholder="Filter by hangup_at date"
      /> -->

      <select
        v-model="statusFilter"
        class="w-[50%] md:w-[30%] border border-gray-300 px-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
      >
        <option value="">Filter by Status</option>
        <option value="answered">answered</option>
        <option value="no-answer">no answer</option>
      </select>
    </div>

    <div class="flow-root w-full overflow-x-auto">
      <div>
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Call ID
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  Application
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  from
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  to
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  answer_at
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  hangup_at
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  duration
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  cost
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  status
                </th>
                <th
                  scope="col"
                  class="text-center sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  Action
                </th>

                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                >
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(call, index) in pagedCalls" :key="call.call_id">
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                  ]"
                >
                  {{ call.call_id }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.application_id }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.from }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.to }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.answer_at }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.hangup_at }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.duration }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.cost }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {{ call.status }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                  ]"
                >
                  <a href="#" class="text-indigo-600 mx-2 hover:text-indigo-900"
                    >Edit<span class="sr-only">, {{ call.call_id }}</span></a
                  >
                  <a
                    href="#"
                    class="text-red-600 mx-2 hover:text-red-900"
                    @click="showDeleteModal = true"
                    >Delete<span class="sr-only">, {{ call.call_id }}</span></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <nav class="flex justify-center md:justify-end items-center mt-2">
        <div
          :class="{ 'opacity-0 cursor-default': currentPage === 1 }"
          class="flex text-sm cursor-pointer"
          @click="goToPage(currentPage - 1)"
        >
          <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <a
          v-for="page in displayedPages"
          :key="page"
          :class="[
            page === currentPage
              ? ' border-t-2 border-indigo-500 px-3 py-2 text-sm font-medium text-indigo-600'
              : ' border-t-2 border-transparent px-3 py-2 text-sm font-medium text-gray-500 cursor-pointer hover:border-gray-300 hover:text-gray-700 '
          ]"
          @click="goToPage(page)"
        >
          {{ page }}
        </a>
        <div
          v-if="Filtered"
          class="flex text-sm cursor-pointer"
          :class="{
            'opacity-0 cursor-default': currentPage === Math.ceil(Filtered / 20)
          }"
          @click="goToPage(currentPage + 1)"
        >
          <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </nav>
    </div>
  </div>
  <div
    v-if="showDeleteModal"
    x-show="showDeleteModal"
    x-cloak
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="modal-overlay absolute inset-0 bg-black opacity-30"
      @click="showDeleteModal = false"
    ></div>

    <div class="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-4 text-left px-6">
        <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p class="text-gray-700 mb-6">Are you sure you want to delete this call?</p>
        <div class="flex justify-end">
          <button class="text-gray-500 text-sm px-4 py-2 mr-2" @click="showDeleteModal = false">
            Cancel
          </button>
          <button class="bg-red-500 text-white text-sm px-4 py-2 rounded" @click="deleteCall">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed, watch } from 'vue'
import { useCallsStore } from '../../stores/CallsStore'
const callsStore = useCallsStore()
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'

const perPage = 20

onMounted(() => {
  callsStore.get_calls(1, 10000000)
})

const callIdFilter = ref('')
const hangupAtFilter = ref('')
const statusFilter = ref('')
const Filtered = ref(null)

const pagedCalls = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage
  const endIndex = startIndex + perPage

  if (!calls.value || !calls.value.data) {
    return []
  }

  let filteredCalls = calls.value.data

  if (callIdFilter.value.trim() !== '') {
    filteredCalls = filteredCalls.filter((call) =>
      call.call_id.toLowerCase().includes(callIdFilter.value.trim().toLowerCase())
    )
  }
  if (hangupAtFilter.value.trim() !== '') {
    filteredCalls = filteredCalls.filter((call) => call.hangup_at === hangupAtFilter.value)
  }
  if (statusFilter.value !== '') {
    filteredCalls = filteredCalls.filter((call) => call.status === statusFilter.value)
  }

  Filtered.value = filteredCalls.length
  return filteredCalls.slice(startIndex, endIndex)
})

const { loading, calls, total } = storeToRefs(callsStore)

const currentPage = ref(1)
const ellipsis = '...'

const displayedPages = computed(() => {
  // console.log(Filtered.value)
  const total = Math.ceil(Filtered.value / perPage)
  const current = currentPage.value
  let pages = []
  if (total <= 5) {
    for (let page = 1; page <= total; page++) {
      pages.push(page)
    }
  } else {
    if (current <= 3) {
      for (let page = 1; page <= 5; page++) {
        pages.push(page)
      }
      if (total > 5) {
        pages.push(ellipsis)
        pages.push(total)
      }
    } else if (current >= total - 2) {
      pages.push(1)
      if (total > 5) {
        pages.push(ellipsis)
      }
      for (let page = total - 4; page <= total; page++) {
        pages.push(page)
      }
    } else {
      pages.push(1)
      if (total > 5) {
        pages.push(ellipsis)
      }
      for (let page = current - 1; page <= current + 1; page++) {
        pages.push(page)
      }
      if (total > 5) {
        pages.push(ellipsis)
      }
      pages.push(total)
    }
  }
  return pages
})

function goToPage(page) {
  if (page >= 1 && page <= Math.ceil(total.value / perPage)) {
    currentPage.value = page
  }
}
const showDeleteModal = ref(false)
function deleteCall() {
  showDeleteModal.value = true
}

watch([callIdFilter, statusFilter], () => {
  currentPage.value = 1
})
</script>

<style>
::-webkit-scrollbar {
  height: 3px;
  width: 2px;
}
::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 1px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #718096;
}
::-webkit-scrollbar-thumb:active {
  background-color: #4a5568;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>
