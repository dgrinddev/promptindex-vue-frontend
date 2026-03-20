<script setup lang="ts">
  import { APP_NAME } from '@/config/env'
  import LegalContactCard from '@/components/other/LegalContactCard.vue'

  const lastUpdated = 'March 2026'
</script>

<template>
  <div class="bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-4xl">
      <header class="text-center">
        <p class="text-base/7 font-semibold text-indigo-400">Legal</p>
        <h1 class="mt-2 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Cookies &amp; Privacy Policy
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg/8 text-gray-300">
          Learn how {{ APP_NAME }} handles cookies, personal data and public prompt content.
        </p>
        <p class="mt-4 text-sm text-gray-500">
          Last updated: {{ lastUpdated }}
        </p>
      </header>

      <main class="mt-16 space-y-12 text-base/7 text-gray-400">
        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Introduction</h2>
          <div class="mt-4 space-y-4">
            <p>
              {{ APP_NAME }} is a community-driven platform for discovering, copying and sharing AI prompts.
              This Cookies &amp; Privacy Policy explains what data we collect, how we use it, and what parts of
              your activity on {{ APP_NAME }} are public by design.
            </p>
            <p>
              By using {{ APP_NAME }}, you acknowledge that prompts, prompt descriptions, uploaded prompt images,
              and your username are intended to be publicly visible to other users and visitors. Your email address
              and password remain private and are not displayed publicly.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Why We Don&apos;t Show a Cookie Banner</h2>
          <div class="mt-4 space-y-4">
            <p>
              {{ APP_NAME }} does not use advertising cookies or similar tracking technologies for marketing
              purposes. We only use cookies and similar technologies that are strictly necessary for the website to
              function properly.
            </p>
            <div class="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
              <p class="text-sm font-medium text-indigo-300">
                Since we only use essential cookies required for core website functionality, no separate cookie
                consent banner is shown. These cookies are described here for transparency.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Cookies and Similar Technologies</h2>
          <div class="mt-4 space-y-6">
            <p>
              We use a limited set of cookies and similar technologies that are necessary to keep {{ APP_NAME }}
              secure, maintain login sessions, and support core features.
            </p>

            <div>
              <h3 class="text-xl font-semibold text-white">Essential Cookies</h3>
              <p class="mt-3">
                These cookies are necessary for the service to work and cannot be switched off because they are used
                for actions such as logging in, staying authenticated, submitting forms securely, and protecting the
                platform from abuse.
              </p>

              <div class="mt-5 overflow-x-auto rounded-2xl border border-white/10">
                <table class="min-w-full divide-y divide-white/10">
                  <thead class="bg-white/5">
                    <tr>
                      <th class="px-4 py-3 text-left text-sm font-semibold text-white">Cookie Name</th>
                      <th class="px-4 py-3 text-left text-sm font-semibold text-white">Purpose</th>
                      <th class="px-4 py-3 text-left text-sm font-semibold text-white">Lifespan</th>
                      <th class="px-4 py-3 text-left text-sm font-semibold text-white">Category</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/10 bg-gray-800/60">
                    <tr>
                      <td class="px-4 py-3 text-sm text-white">promptindex_session</td>
                      <td class="px-4 py-3 text-sm">
                        Maintains your session while you browse the website and use your account.
                      </td>
                      <td class="px-4 py-3 text-sm">Session</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
                          Strictly Necessary
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 text-sm text-white">XSRF-TOKEN</td>
                      <td class="px-4 py-3 text-sm">
                        Protects against cross-site request forgery (CSRF) attacks when forms and authenticated
                        actions are submitted.
                      </td>
                      <td class="px-4 py-3 text-sm">Session</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
                          Strictly Necessary
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 text-sm text-white">Auth Token (varies)</td>
                      <td class="px-4 py-3 text-sm">
                        Remembers your authenticated state securely after login.
                      </td>
                      <td class="px-4 py-3 text-sm">Session</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
                          Strictly Necessary
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 text-sm text-white">_cfuvid</td>
                      <td class="px-4 py-3 text-sm">
                        Cloudflare security and session-affinity cookie used for traffic protection and reliable
                        delivery.
                      </td>
                      <td class="px-4 py-3 text-sm">Session</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
                          Strictly Necessary
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Information We Collect</h2>
          <div class="mt-6 space-y-8">
            <section>
              <h3 class="text-xl font-semibold text-white">Account Information</h3>
              <p class="mt-3">When you create an account, we may collect:</p>
              <ul class="mt-3 list-disc space-y-1 pl-6">
                <li>Username</li>
                <li>Email address</li>
                <li>Password (hashed and securely stored)</li>
              </ul>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">Public Content Data</h3>
              <p class="mt-3">When you use {{ APP_NAME }}, we may collect and store content you choose to publish, including:</p>
              <ul class="mt-3 list-disc space-y-1 pl-6">
                <li>Prompt titles, prompt content, and prompt descriptions</li>
                <li>Images uploaded to prompts</li>
                <li>Prompt-related metadata and categories</li>
                <li>Your username in connection with the prompts you publish</li>
              </ul>
              <p class="mt-3">
                This content is public by design and may be visible to everyone, including people who do not have an
                account.
              </p>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">Technical Information</h3>
              <p class="mt-3">We may automatically collect technical information such as:</p>
              <ul class="mt-3 list-disc space-y-1 pl-6">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device and screen information</li>
                <li>Basic server logs used for security, reliability, and abuse prevention</li>
              </ul>
            </section>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">How We Use Your Information</h2>
          <div class="mt-4 space-y-4">
            <p>We use collected information to:</p>
            <ul class="list-disc space-y-1 pl-6">
              <li>Provide and maintain the {{ APP_NAME }} platform</li>
              <li>Display public prompts and related public profile information</li>
              <li>Authenticate users and secure accounts</li>
              <li>Prevent abuse, spam, fraud, and unauthorized access</li>
              <li>Communicate important account or legal notices</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Public vs. Private Information</h2>
          <div class="mt-4 space-y-4">
            <div class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
              <h3 class="text-xl font-semibold text-white">Public Information</h3>
              <p class="mt-3">
                The prompts you publish, any images attached to those prompts, and your username are public and can be
                seen, copied, and reused by others.
              </p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
              <h3 class="text-xl font-semibold text-white">Private Information</h3>
              <p class="mt-3">
                Your email address and password are not shown publicly. Your password is stored securely, and your
                email address is used only for account-related purposes such as authentication, account recovery, and
                essential communication.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Data Processors and Third-Party Services</h2>
          <div class="mt-6 grid gap-6">
            <article class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
              <h3 class="text-xl font-semibold text-white">Hosting Infrastructure</h3>
              <div class="mt-4 space-y-3">
                <p><span class="font-medium text-white">Provider:</span> Laravel Cloud</p>
                <p><span class="font-medium text-white">Purpose:</span> Hosting, database operations, application processing, and storage.</p>
                <p><span class="font-medium text-white">Location:</span> EU Central (Frankfurt, Germany).</p>
              </div>
            </article>

            <article class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
              <h3 class="text-xl font-semibold text-white">Cloudflare</h3>
              <div class="mt-4 space-y-3">
                <p><span class="font-medium text-white">Purpose:</span> CDN, DDoS protection, security filtering, and performance optimization.</p>
                <p>
                  <span class="font-medium text-white">International transfers:</span> Cloudflare may process traffic in multiple countries,
                  including outside the EU, using appropriate safeguards such as Standard Contractual Clauses.
                </p>
              </div>
            </article>

            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              We rely on these providers to operate {{ APP_NAME }} securely and efficiently. They process data only as
              needed to deliver the service.
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Information Sharing</h2>
          <div class="mt-4 space-y-4">
            <p>
              We do not sell your personal information to third parties. However, the content you intentionally publish
              on {{ APP_NAME }} is shared publicly because that is the core purpose of the platform.
            </p>
            <p>We may also disclose information in limited situations, such as:</p>
            <ul class="list-disc space-y-1 pl-6">
              <li>When required by law or legal process</li>
              <li>To protect the safety, rights, or security of users, the public, or the platform</li>
              <li>When you give explicit consent</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Data Security</h2>
          <div class="mt-4 space-y-4">
            <p>We use appropriate security measures, including:</p>
            <ul class="list-disc space-y-1 pl-6">
              <li>HTTPS/TLS encryption for data in transit</li>
              <li>Password hashing and access controls</li>
              <li>Security monitoring and abuse prevention measures</li>
              <li>Regular updates and general security best practices</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Your Privacy Rights</h2>
          <div class="mt-4 space-y-4">
            <p>Depending on your location, you may have rights such as:</p>
            <ul class="list-disc space-y-1 pl-6">
              <li>Access to the personal data we hold about you</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your account and private account data</li>
              <li>Objection to certain types of processing</li>
              <li>Data portability where applicable</li>
            </ul>
            <p>
              Please note that content you published publicly may remain visible to others if it has already been
              copied, quoted, screenshotted, archived, or republished elsewhere.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Data Retention</h2>
          <div class="mt-4 space-y-4">
            <ul class="list-disc space-y-1 pl-6">
              <li>Account data is retained until you delete your account or request deletion, unless longer retention is legally required.</li>
              <li>Public prompts and related public content remain available until you delete them or your account.</li>
              <li>Some server logs and technical records may be retained for security, fraud prevention, and legal compliance for a limited period.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Changes to This Policy</h2>
          <div class="mt-4 space-y-4">
            <p>
              We may update this Cookies &amp; Privacy Policy from time to time. Any changes will be posted on this page
              with a revised update date.
            </p>
            <p>
              If changes are significant, we may also notify users through the service or by email.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Contact Information</h2>
          <div class="mt-4 space-y-4">
            <p>If you have questions about this Cookies &amp; Privacy Policy or want to exercise your privacy rights, please contact us.</p>
            <LegalContactCard />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>