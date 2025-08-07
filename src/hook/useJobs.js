import { useState, useEffect } from 'react'
import apiService from '../services/api'

export const useJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getAllJobs()
      setJobs(data.jobs || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchJobsWithFilters = async (filters) => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (filters.keyword) params.append('keyword', filters.keyword)
      if (filters.location) params.append('location', filters.location)
      if (filters.jobType && filters.jobType.length > 0) params.append('jobType', filters.jobType.join(','))
      if (filters.experience && filters.experience.length > 0) params.append('experience', filters.experience.join(','))
      if (filters.salary && filters.salary.length === 2) {
        params.append('salaryMin', filters.salary[0])
        params.append('salaryMax', filters.salary[1])
      }
      if (filters.datePosted) params.append('datePosted', filters.datePosted)
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      const data = await apiService.getAllJobs(params.toString() ? `?${params.toString()}` : '')
      setJobs(data.jobs || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching jobs with filters:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const createJob = async (jobData) => {
    try {
      await apiService.createJob(jobData)
      await fetchJobs() // Refresh the list
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const updateJob = async (id, jobData) => {
    try {
      await apiService.updateJob(id, jobData)
      await fetchJobs() // Refresh the list
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const deleteJob = async (id) => {
    try {
      await apiService.deleteJob(id)
      await fetchJobs() // Refresh the list
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    fetchJobsWithFilters,
    createJob,
    updateJob,
    deleteJob,
  }
}

export const useJob = (id) => {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return

      try {
        setLoading(true)
        setError(null)
        const data = await apiService.getJobById(id)
        setJob(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching job:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  return { job, loading, error }
}

