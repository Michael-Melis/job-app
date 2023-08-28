import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { Stack, useRouter, useGlobalSearchParams, router } from 'expo-router';
import { useState, useCallback } from 'react';
import {
  Company,
  JobAbout,
  JobFooter,
  ScreenHeaderBtn,
  JobTabs,
  Specifics,
} from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from './../../hook/useFetch';

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false);

  const params = useGlobalSearchParams();
  const router = useRouter();
  const { data, error, isLoading } = useFetch('job-details', {
    job_id: params.id,
  });

  const onRefresh = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension='60%'
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
            ),
          },
          headerTitle: '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs />
              <JobAbout job={data?.job} />
              <Specifics specifics={data?.specifics} />

              <JobFooter />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
