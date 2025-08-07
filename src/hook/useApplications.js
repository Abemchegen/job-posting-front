import { useState, useEffect } from 'react'
import apiService from '../services/api'

export const useApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getAllApplications()
      setApplications(data.applications || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching applications:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const updateApplicationStatus = async (id, status) => {
    try {
      await apiService.updateApplicationStatus(id, status)
      await fetchApplications() // Refresh the list
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return {
    applications,
    loading,
    error,
    fetchApplications,
    updateApplicationStatus,
  }
}

export const useJobApplications = (jobId) => {
  const [applications, setApplications] = useState([])
  const [jobInfo, setJobInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJobApplications = async () => {
    if (!jobId) return

    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getJobApplications(jobId)
      setApplications(data.applications || [])
      setJobInfo(data.job || null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching job applications:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobApplications()
  }, [jobId])

  const updateApplicationStatus = async (id, status) => {
    try {
      await apiService.updateApplicationStatus(id, status)
      await fetchJobApplications() // Refresh the list
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return {
    applications,
    jobInfo,
    loading,
    error,
    fetchJobApplications,
    updateApplicationStatus,
  }
}

export const useApplication = (id) => {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return

      try {
        setLoading(true)
        setError(null)
        const data = await apiService.getApplicationById(id)
        setApplication(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching application:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [id])

  const updateStatus = async (status) => {
    try {
      await apiService.updateApplicationStatus(id, status)
      // Update local state
      setApplication(prev => ({
        ...prev,
        status
      }))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return { 
    application, 
    loading, 
    error,
    updateStatus
  }
}

