import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { VibeResult } from '../types';
import { vibePersonas } from '../data/quizData';
import { services } from '../data/servicesData';

// Register custom fonts if needed (optional)
// Font.register({ family: 'YourFont', src: 'path/to/font.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#0A0118',
    padding: 40,
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #FF1493',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  scoreSection: {
    backgroundColor: '#1a0f2e',
    padding: 30,
    borderRadius: 12,
    marginBottom: 20,
    borderLeft: '4 solid #FF1493',
  },
  scoreNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 10,
  },
  personaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  personaDescription: {
    fontSize: 12,
    color: '#D1D5DB',
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FFFF',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  insightText: {
    fontSize: 11,
    color: '#D1D5DB',
    lineHeight: 1.6,
    marginBottom: 15,
  },
  priorityItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  priorityBullet: {
    fontSize: 14,
    color: '#FF1493',
    marginRight: 8,
  },
  priorityText: {
    fontSize: 11,
    color: '#D1D5DB',
    flex: 1,
  },
  serviceCard: {
    backgroundColor: '#1a0f2e',
    padding: 20,
    borderRadius: 12,
    borderLeft: '4 solid #8B5CF6',
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  serviceTagline: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 15,
  },
  serviceDescription: {
    fontSize: 10,
    color: '#D1D5DB',
    lineHeight: 1.5,
  },
  ctaSection: {
    backgroundColor: '#1a0f2e',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 12,
    color: '#D1D5DB',
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#FF1493',
    padding: '12 30',
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: '1 solid #FF1493',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#6B7280',
  },
  footerUrl: {
    fontSize: 10,
    color: '#00FFFF',
    marginTop: 5,
  },
});

interface VibeReportPDFProps {
  vibeResult: VibeResult;
  email: string;
}

export const VibeReportPDF = ({ vibeResult, email }: VibeReportPDFProps) => {
  const persona = vibePersonas[vibeResult.type as keyof typeof vibePersonas];
  const recommendedService = services.find(s => s.id === vibeResult.recommendedService);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>RAIZE THE VIBE</Text>
          <Text style={styles.subtitle}>Your Personalized Vibe Check Report</Text>
          <Text style={styles.subtitle}>Generated for: {email}</Text>
        </View>

        {/* Score Section */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreNumber}>{vibeResult.score}/100</Text>
          <Text style={styles.personaTitle}>{vibeResult.type}</Text>
          <Text style={styles.personaDescription}>{persona?.description}</Text>
        </View>

        {/* Personalized Insight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We're Already Thinking For You</Text>
          <Text style={styles.insightText}>{vibeResult.personalizedInsight}</Text>
        </View>

        {/* Top Priorities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Top Priorities</Text>
          {vibeResult.topPriorities.map((priority, index) => (
            <View key={index} style={styles.priorityItem}>
              <Text style={styles.priorityBullet}>✓</Text>
              <Text style={styles.priorityText}>{priority}</Text>
            </View>
          ))}
        </View>

        {/* Recommended Service */}
        {recommendedService && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <View style={styles.serviceCard}>
              <Text style={styles.serviceName}>{recommendedService.name}</Text>
              <Text style={styles.serviceTagline}>{recommendedService.tagline}</Text>
              <Text style={styles.servicePrice}>{recommendedService.priceDisplay}</Text>
              <Text style={styles.serviceDescription}>{recommendedService.description}</Text>
            </View>
          </View>
        )}

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Vibe Check This?</Text>
          <Text style={styles.ctaText}>
            Let's have a real conversation about what's possible for your business.
            No pressure, no pitch — just two humans talking about your vision.
          </Text>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Book Your Free Call</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Raize The Vibe. All rights reserved.</Text>
          <Text style={styles.footerUrl}>https://raizethevibe.com</Text>
        </View>
      </Page>
    </Document>
  );
};
